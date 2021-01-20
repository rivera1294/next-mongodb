import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

export const useBaseStyles = makeStyles((theme: Theme) =>
  createStyles({
    noPaddingMobile: {
      [theme.breakpoints.down('sm')]: {
        padding: '0px',
      },
    },
    btnsBox: {
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1, 2, 1, 2),
      },
    },
    noMarginTopBottomMobile: {
      [theme.breakpoints.down('sm')]: {
        marginTop: '0px',
        marginBottom: '0px',
      },
    },

    // Customizable listing wrapper:
    customizableListingWrapper: {
      '& ul': {
        // border: '1px solid red',
        listStyleImage: 'url(/static/svg/yellow-dot.svg)',
      },

      '& ul, ol': {
        '& > li': {
          paddingLeft: '5px',
          '& > p': {
            display: 'inline',
          },
          '& input[type="checkbox"]': {
            display: 'block',
            transform: 'translateY(-5px)',
          },
        },
        '& > li:not(:last-child)': {
          marginBottom: '15px',
        },
      },

      /*
      '& .internal-block': {
        [theme.breakpoints.up('md')]: {
          marginLeft: '22px',
        },
        [theme.breakpoints.down('sm')]: {
          marginLeft: '0px',
        },
      },
      '& .inline-padded-elm': {
        display: 'block',
        width: '100%',
        marginBottom: '20px',
      },

      '& ul, ol': {
        '& > li:not(:last-child)': {
          marginBottom: '10px',
        },
      },
      '& ol': {
        maxWidth: '100%',
        paddingLeft: 0,
        marginTop: 0,
        listStyle: 'none',
        counterReset: 'myCounter',
        // '& > li:not(:last-child)': {marginBottom: '10px' },
        '& > li::before': {
          counterIncrement: 'myCounter',
          content: "counter(myCounter) '.'",
          color: 'inherit',
          display: 'inline-block',
          textAlign: 'center',
          margin: '0 15px 0 0',
          lineHeight: '40px',
          // width: '10px',
          minWidth: '10px',
          height: '10px',
          whiteSpace: 'pre-wrap',
          wordBreak: 'normal',
          maxWidth: '100%',
        },
      },

      '& ol.custom-numeric': {
        counterReset: 'myCounter',
        '& > li': {
          listStyle: 'none',
          // marginBottom: '10px',
        },
        '& > li:before': {
          counterIncrement: 'myCounter',
          content: 'counter(myCounter) .',
          color: '#3882C4',
          // background: '#2980B9',
          display: 'inline-block',
          textAlign: 'center',
          // margin: '5px 10px',
          lineHeight: '25px',
          // width: '25px',
          minWidth: '25px',
          marginRight: '10px',
          height: '25px',
        },
      },
      '& ul.dotted': {
        maxWidth: '100%',
        paddingLeft: 0,
        marginTop: 0,
        listStyle: 'none',
        '& > li::before': {
          color: 'inherit',
          display: 'inline-block',
          textAlign: 'center',
          margin: '0 15px 0 0',
          lineHeight: '40px',
          width: '10px',
          height: '10px',
          whiteSpace: 'pre-wrap',
          wordBreak: 'normal',
          maxWidth: '100%',
        },
        '& > li': {
          display: 'flex',
          alignItems: 'start',
        },
        '& > li > .dot': {
          color: 'white',
          background: '#fff',
          display: 'inline-block',
          textAlign: 'center',
          marginRight: '20px',
          lineHeight: '30px',
          // width: '20px',
          minWidth: '20px',
          height: '20px',
          backgroundImage: 'url(/static/svg/yellow-dot.svg)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right',
          // backgroundSize: 'contain',
        },
        '& > li > .empty': {
          minWidth: '20px',
          height: '20px',
          display: 'inline-block',
          textAlign: 'center',
          marginRight: '20px',
          lineHeight: '30px',
        },
        '& > li > .attention': {
          color: 'white',
          background: '#fff',
          display: 'inline-block',
          textAlign: 'center',
          marginRight: '10px',
          lineHeight: '30px',
          // width: '20px',
          minWidth: '30px',
          height: '30px',
          backgroundImage: 'url(/static/svg/yellow-attention.svg)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'contain',
        },
      },
      */
    },

    // Actions box:
    actionsBoxRight: {
      marginTop: '10px',

      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
      '& > button': {
        marginBottom: theme.spacing(1),
      },
      '& > button:not(:first-child)': {
        marginLeft: theme.spacing(1),
      },
    },
    actionsBoxLeft: {
      marginTop: '10px',

      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      '& > button': {
        marginBottom: theme.spacing(1),
      },
      '& > button:not(:last-child)': {
        marginRight: theme.spacing(1),
      },
    },
  })
)
