const commmonThemeSettings = {
  fontFamily: 'var(--font-mono)',
  gutterForeground: 'rgb(var(--editor-line-numbers-color))',
  selection: 'rgb(var(--editor-code-selection-color))',
};

export const requestPanelThemeSettings = {
  ...commmonThemeSettings,
  background: 'rgb(var(--editor-primary-color))',
  gutterBackground: 'rgb(var(--editor-gutter-color))',
};

export const responsePanelThemeSettings = {
  ...commmonThemeSettings,
  background: 'rgb(var(--editor-secondary-color))',
  gutterBackground: 'rgb(var(--editor-secondary-color))',
};
