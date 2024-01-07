const commmonEditorThemeSettings = {
  fontFamily: 'var(--font-mono)',
  gutterForeground: 'rgb(var(--editor-line-numbers-color))',
};

export const primaryEditorThemeSettings = {
  ...commmonEditorThemeSettings,
  background: 'rgb(var(--editor-primary-color))',
  gutterBackground: 'rgb(var(--editor-gutter-color))',
};

export const secondaryEditorThemeSettings = {
  ...commmonEditorThemeSettings,
  background: 'rgb(var(--editor-secondary-color))',
  gutterBackground: 'rgb(var(--editor-secondary-color))',
};
