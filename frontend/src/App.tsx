import "@elastic/eui/dist/eui_theme_dark.css";
import "./index.scss";
import "./index.css";
import "./App.css";

import {
  EuiProvider,
  EuiEmptyPrompt,
  EuiLink,
  EuiFlexGroup,
  EuiTitle,
  EuiIcon,
} from "@elastic/eui";
import PixelCanvas from "./PixelCanvas";

const MyApp = () => {
  return (
    <EuiProvider>
      <div className="app-content">
        <div className={`bg-image-wrapper`} />
        <EuiEmptyPrompt
          icon={<div className="app-logo" />}
          title={
            <EuiTitle className="logo-subtext" size="l">
              <h1>QuickStitch</h1>
            </EuiTitle>
          }
        />
        <EuiFlexGroup className={"eui-flex-dotting"}>
            <PixelCanvas/>
        </EuiFlexGroup>
        <div className="qs-footer">
          <span>
            © 2026 {Math.random() > 0.5 ? "Jiv" : "Lames"}{" "}
            <EuiLink
              href="https://github.com/jamesgiu/quick-stitch"
              target="https://github.com/jamesgiu/quick-stitch"
            >
              <EuiIcon size="l" type={"logoGithub"} />
            </EuiLink>
          </span>
        </div>
      </div>
    </EuiProvider>
  );
};

export default MyApp;
