import { EuiIcon, EuiLink } from "@elastic/eui";

export const AppFooter = () => (
  <footer className="qs-footer">
    <span>
      © 2026 QuickStitch{" "}
      <EuiLink href="https://github.com/jamesgiu/quick-stitch" target="https://github.com/jamesgiu/quick-stitch">
        <EuiIcon size="l" type={"logoGithub"} />
      </EuiLink>
    </span>
      </footer>
);

export default AppFooter;
