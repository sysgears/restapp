import * as React from 'react';
import jwt from './jwt';
import session from './session';
import AccessModule from './AccessModule';

interface PageReloaderProps {
  children?: React.ReactElement;
}

interface AuthPageReloaderProps extends PageReloaderProps {}

const ref: React.RefObject<any> = React.createRef();

const rerenderApp = () => {
  ref.current.reloadPage();
};

const login = async (_clearStore?: () => void) => {
  rerenderApp();
};

const logout = async (clearStore: () => void) => {
  await clearStore();
  rerenderApp();
};

class PageReloader extends React.Component<PageReloaderProps> {
  public state = {
    key: 1
  };

  public reloadPage() {
    this.setState({ key: this.state.key + 1 });
  }

  public render() {
    return React.cloneElement(this.props.children, { key: this.state.key });
  }
}

const AuthPageReloader = ({ children }: AuthPageReloaderProps) => <PageReloader ref={ref}>{children}</PageReloader>;

export default new AccessModule(jwt, session, {
  dataRootComponent: [AuthPageReloader],
  login: [login],
  logout: [logout]
});