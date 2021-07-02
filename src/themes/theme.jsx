import { createMuiTheme } from '@material-ui/core'


const colorCode = {
  appBackground : '#f4f5fd',
  headerToolbar: '#545A61',
  sectionBackgound: '#B7BEBB',
  paperBackground: '#0000008a',
  errorMessage: '#E2231A',
  pageContent: '#B7BEBB',
  editorPaper: '#f5f6fa',
  /*********Property Tree */
  textboxPropertyTreeColor: '#fafbff',
  propertyTreeRoot: '#57a3eb',
  /**********node update tree */
  paperBorderNodeUpdateTree : '#E7EFEB',
  paperBackgroundNodeUpdateTree : 'transparent',
  searchedValueNodeUpdateTree : '#e4eb31',
  searchedTextNodeUpdateTree : 'red',
  listIconNodeUpdateTree : '#ff6464'
}

export const theme = createMuiTheme({
  palette: {
    primary: {main: colorCode.appBackground},
    secondary:{main: colorCode.headerToolbar},
    error:{main: colorCode.errorMessage},
    /**********************Text Color */
    contentColor: {
      white: '#fff',
      black: '#000',
      grey: '#808080'
    },
    /*********header */
    header: {main: colorCode.headerToolbar,contrastText: '#fff' },
    pageContent: {main: colorCode.pageContent, contrastText: '#000'},
    /****************View Section */
    tabBgViewSection: {main: '#585b5f'},
    /*******editor */
    editorPaper: {main: colorCode.editorPaper},
    /**********property tree */
    textboxPropertyTree: {main: colorCode.textboxPropertyTreeColor},
    propertyTreeRoot: {main: colorCode.propertyTreeRoot},
    searchInputPropertyTree: {main: 'd3d3d3'},
    /***************property update */
    accordionSectionPropertyUpdate : {main : 'linear-gradient(182deg, #e1e6e6, #fffffff5)'},
    /********************* node update tree */
    paperBorderNodeUpdateTree : {main: '#E7EFEB'},
    paperBackgroundNodeUpdateTree : {main: 'transparent'},
    searchedValueNodeUpdateTree : { main: '#e4eb31' },
    searchedTextNodeUpdateTree : {main : 'red'},
    listIconNodeUpdateTree : {main : '#ff6464'},
    /***************JSON Schema window */
    buttonStyleJsonSchemaWindow: {main: 'linear-gradient(45deg, #545A61 30%, #545A61 100%)'},
    tabBottomJsonSchemaWindow: {main : '#e8e8e8'},
    /*******************View Section */
    viewSectiontab :{main: '#818284', border:'#19f5f5', boxshadow: '#484747'},
  
  },
  typography: {
    useNextVariants: true,
    fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
  },  
  shape: {
    borderRadius: '12px'
  },
  props: {
    // Name of the component
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true // No more ripple, on the whole application!
    }
  },
  overrides: {
    MuiApiBar: {
      root: {
        transform: 'translateZ(0)'
      }
    },
      MuiCssBaseline: {
        '@global': {
          '*': {
            'scrollbar-width': 'thin',
          },
          '*::-webkit-scrollbar': {
            width: '6px',
            height: '6px',
          },
          /* Track */
          '::-webkit-scrollbar-track' : {
            background: '#f1f1f1'
          },

          /* Handle */
          '::-webkit-scrollbar-thumb':  {
            background: '#57a3eb'
          },

          /* Handle on hover */
          '::-webkit-scrollbar-thumb:hover' : {
            background: '#555'
          },
        }
      }
  }
  
});