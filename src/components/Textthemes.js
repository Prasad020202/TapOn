export const getThemeColors = (themeName) => {
    switch (themeName) {
      case 'template_1':
        return {
          textTemp: 'white',
        };
      case 'template_2':
        return {
          textTemp: 'black',

        };
        case 'template_3':
        return {
          textTemp: 'red',

        };
        case 'template_4':
        return {
          textTemp: 'blue',

        };
        case 'template_5':
        return {
          textTemp: 'yellow',

        };
      // Add more cases for other themes as needed
      default:
        return {
          textTemp: 'black',

        };
    }
  };
  