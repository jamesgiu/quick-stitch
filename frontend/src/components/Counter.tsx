import { EuiButton, EuiFlexGroup, EuiFlexItem, EuiText } from "@elastic/eui";
import { useProjectStore } from "../projectStore";
import "./Counter.css";

const Counter = () => {
  const selectedProjectId = useProjectStore((state) => state.selectedProjectId);
  const selectedProject = useProjectStore((state) => state.getSelectedProject());
  const incrementCounter = useProjectStore((state) => state.incrementCounter);
  const decrementCounter = useProjectStore((state) => state.decrementCounter);

  if (!selectedProjectId || !selectedProject) {
    return null;
  }

  const handleIncrement = () => {
    incrementCounter(selectedProjectId);
  };

  const handleDecrement = () => {
    decrementCounter(selectedProjectId);
  };

  return (
    <div className="counter-container">
      <EuiFlexGroup alignItems="center" justifyContent="center" responsive={false}>
        <EuiFlexItem grow={false}>
          <EuiButton
            color="danger"
            iconType="minus"
            onClick={handleDecrement}
            aria-label="Decrease counter"
          >
            Minus
          </EuiButton>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiText size="m" className="counter-display">
            <strong>{selectedProject.counter}</strong>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton
            color="success"
            iconType="plus"
            onClick={handleIncrement}
            aria-label="Increase counter"
          >
            Plus
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
};

export default Counter;
