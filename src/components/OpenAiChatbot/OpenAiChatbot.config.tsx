import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { MdOutlineTextSnippet } from 'react-icons/md';

import OpenAiChatbotSettings, { BasicSettings } from './OpenAiChatbot.settings';

export default {
  craft: {
    displayName: 'OpenAiChatbot',
    kind: EComponentKind.BASIC,
    props: {
      name: '',
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(OpenAiChatbotSettings, BasicSettings),
    },
  },
  info: {
    settings: OpenAiChatbotSettings,
    displayName: 'OpenAiChatbot',
    exposed: true,
    icon: MdOutlineTextSnippet,
    events: [
      {
        label: 'On Click',
        value: 'onclick',
      },
      {
        label: 'On Blur',
        value: 'onblur',
      },
      {
        label: 'On Focus',
        value: 'onfocus',
      },
      {
        label: 'On MouseEnter',
        value: 'onmouseenter',
      },
      {
        label: 'On MouseLeave',
        value: 'onmouseleave',
      },
      {
        label: 'On KeyDown',
        value: 'onkeydown',
      },
      {
        label: 'On KeyUp',
        value: 'onkeyup',
      },
    ],
    datasources: {
      accept: ['string'],
    },
  },
  defaultProps: {},
} as T4DComponentConfig<IOpenAiChatbotProps>;

export interface IOpenAiChatbotProps extends webforms.ComponentProps {}
