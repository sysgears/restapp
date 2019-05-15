import ServerModule from '@restapp/module-server-ts';
import github from './github';
import google from './google';
import facebook from './facebook';
import linkedin from './linkedIn';

export default new ServerModule(github, google, facebook, linkedin);
