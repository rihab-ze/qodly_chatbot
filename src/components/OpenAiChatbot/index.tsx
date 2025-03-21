import config, { IOpenAiChatbotProps } from './OpenAiChatbot.config';
import { T4DComponent, useEnhancedEditor } from '@ws-ui/webform-editor';
import Build from './OpenAiChatbot.build';
import Render from './OpenAiChatbot.render';

const OpenAiChatbot: T4DComponent<IOpenAiChatbotProps> = (props) => {
  const { enabled } = useEnhancedEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return enabled ? <Build {...props} /> : <Render {...props} />;
};

OpenAiChatbot.craft = config.craft;
OpenAiChatbot.info = config.info;
OpenAiChatbot.defaultProps = config.defaultProps;

export default OpenAiChatbot;
