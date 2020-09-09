declare module "expo-sqlite" {
  declare function openDatabase(
    name:
      | string
      | {
          name: string;
          version?: string;
          description?: string;
          size?: number;
          callback?: () => any;
        },
    version?: string,
    description?: string,
    size?: number,
    callback?: () => any
  ): any;
}
