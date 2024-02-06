export const getThemeColors = (themeName) => {
    switch (themeName) {
      case 'template_1':
        return {
          textTemp: 'white',
          backgroundcards: '#0C090A',
          bordercolor:'white',
        };
      case 'template_2':
        return {
          textTemp: 'black',
          backgroundcards: 'white',
          bordercolor:'black',

        };
        case 'template_3':
        return {
          textTemp: 'red',
          backgroundcards: 'white',
          bordercolor:'black',

        };
        case 'template_4':
        return {
          textTemp: 'blue',
          backgroundcards: 'white',
          bordercolor:'black',

        };
        case 'template_5':
        return {
          textTemp: 'yellow',
          backgroundcards: 'white',
          bordercolor:'black',

        };
      // Add more cases for other themes as needed
      default:
        return {
          textTemp: 'black',
          backgroundcards: 'white',
          bordercolor:'black',

        };
    }
  };
  