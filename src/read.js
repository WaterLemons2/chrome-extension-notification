// @ts-check

/**
 * @param {FileSystemDirectoryEntry} dirEntry
 */
function readFiles(dirEntry) {
    const reader = new FileReader();

    return new Promise((resolve) =>
        dirEntry.createReader().readEntries((e) => {
            readFile(e).then(resolve);
        })
    );

    /**
     * @param {FileSystemEntry[]} entries
     */
    function readFile(entries) {
        const paths = getPaths(entries);

        const results = {};
        return new Promise((resolve) => {
            let path = paths.shift();

            reader.onload = (e) => {
                if (!(e.target && path)) return;
                results[trimExt(path)] = e.target.result;

                path = paths.shift();
                if (!path) resolve(results);
                read(path);
            };

            read(path);
        });
    }

    function read(path) {
        dirEntry.getFile(
            path,
            {},
            /** @param {FileEntry} fe */ (fe) =>
                fe.file((f) => reader.readAsText(f))
        );
    }
}

function readDir(path) {
    return new Promise((resolve) => {
        chrome.runtime.getPackageDirectoryEntry((dir) => {
            dir.getDirectory(path, {}, (e) => resolve(readFiles(e)));
        });
    });
}

/**
 * @param {FileSystemEntry[]} entries
 */
function getPaths(entries) {
    return entries.filter((entry) => entry.isFile).map((entry) => entry.name);
}
