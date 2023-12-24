type FilePathOptions = {
    filename: string;
    root?: string;
    defaultDocument?: string;
};

export const getFilePath = (options: FilePathOptions): string => {
    let filename = options.filename;
    //won't allow for root access
    if (/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(filename)) return 'No root access for you';

    let root = options.root || '';
    const defaultDocument = options.defaultDocument || 'index.html';

    if (filename.endsWith('/')) filename = filename.concat(defaultDocument);
    else if (!filename.match(/\.[a-zA-Z0-9]+$/)) filename = filename.concat('/' + defaultDocument);
    

    filename = filename.replace(/^\.?[\/\\]/, '');
    filename = filename.replace(/\\/, '/');

    root = root.replace(/\/$/, '');

    let path = root ? root + '/' + filename : filename;
    path = path.replace(/^\.?\//, '');
    
    return path;
};
