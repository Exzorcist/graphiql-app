const commmonThemeSettings = {
  fontFamily: 'rgb(var(--editor-code-font-family))',
  gutterForeground: 'rgb(var(--editor-line-numbers-color))',
  selection: 'rgb(var(--editor-code-selection-color))',
  lineHighlight: 'transparent',
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
