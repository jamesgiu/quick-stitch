import { EuiIcon, EuiLink } from "@elastic/eui";

export const AppFooter = () => (
  <div className="qs-footer">
    <span>
      © 2026 {Math.random() > 0.5 ? "Jiv" : "Lames"}{" "}
      <EuiLink href="https://github.com/jamesgiu/quick-stitch" target="https://github.com/jamesgiu/quick-stitch">
        <EuiIcon size="l" type={"logoGithub"} />
      </EuiLink>
    </span>
  </div>
);

export default AppFooter;
