declare var __TEST__: boolean;
declare var __SERVER__: boolean;
declare var __CLIENT__: boolean;
declare var __SSR__: boolean;
declare var __API_URL__: string;
declare var __WEBSITE_URL__: string;

interface Window {
  __SERVER_ERROR__?: any;
  Stripe?: any;
}

// packages without types
declare module 'react-native-credit-card-input';
declare module 'sourcemapped-stacktrace';
declare module 'react-stripe-elements';
declare module 'minilog';
declare module 'reactstrap';
declare module 'react-helmet' {
  import { HelmetProps } from 'react-helmet';
  
  export interface NewHelmetProps extends HelmetProps {
    onChangeClientState?: (newState: any, addedTags: any, removedTags: any) => void;
  }

  export default class Helmet extends React.Component<NewHelmetProps> {
    static peek(): HelmetData;
    static rewind(): HelmetData;
    static renderStatic(): HelmetData;
    static canUseDOM: boolean;
  }
}
