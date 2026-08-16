import { EuiEmptyPrompt, EuiTitle } from "@elastic/eui";

export const AppHeader = () => (
  <EuiEmptyPrompt
    icon={<div className="app-logo" />}
    title={
      <EuiTitle className="logo-subtext" size="l">
        <h1>QuickStitch</h1>
      </EuiTitle>
    }
  />
);

export default AppHeader;
