import ClientModule from '@restapp/module-client-react-native';
import onAppCreate from './AwakeInDevApp';

export default new ClientModule({
  onAppCreate: [onAppCreate]
});
