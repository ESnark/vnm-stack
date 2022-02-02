module.exports = {
  displayName: 'dashboard-app',
  preset: '../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]s$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../coverage/apps/dashboard/app',
};
