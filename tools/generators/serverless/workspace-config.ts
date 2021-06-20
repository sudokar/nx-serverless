import { addProjectConfiguration, Tree } from '@nrwl/devkit';

const buildRunCommandConfig = (dir: string, command: string) => ({
  executor: '@nrwl/workspace:run-commands',
  options: {
    cwd: dir,
    color: true,
    command: command,
  },
});

export const addWorkspaceConfig = (
  host: Tree,
  projectName: string,
  stackRoot: string
) => {
  addProjectConfiguration(host, projectName, {
    root: stackRoot,
    projectType: 'application',
    sourceRoot: stackRoot + '/src',
    targets: {
      build: {
        ...buildRunCommandConfig(stackRoot, 'sls package'),
      },
      serve: {
        ...buildRunCommandConfig(stackRoot, 'sls offline start'),
      },
      deploy: {
        ...buildRunCommandConfig(stackRoot, 'sls deploy'),
      },
      remove: {
        ...buildRunCommandConfig(stackRoot, 'sls remove'),
      },
      lint: {
        executor: '@nrwl/linter:eslint',
        options: {
          lintFilePatterns: [stackRoot + '/**/*.ts'],
        },
      },
    },
    tags: ['stack'],
  });
};
