import {  TSetting } from '@ws-ui/webform-editor';
import { BASIC_SETTINGS, DEFAULT_SETTINGS, load } from '@ws-ui/webform-editor';



const Settings: TSetting[] = [
 
  ...DEFAULT_SETTINGS,
];

export const BasicSettings: TSetting[] = [
  ...load(BASIC_SETTINGS).filter('style.overflow'),
];

export default Settings;
