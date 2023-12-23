type FilePathOptions = {
    filename: string;
    root?: string;
    defaultDocument?: string;
};

export const getFilePath = (options: FilePathOptions): string | undefined => {
    console.log(options)
  return;
};
