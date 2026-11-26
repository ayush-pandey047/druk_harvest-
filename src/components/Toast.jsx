import { Link } from 'react-router-dom';
import Icon from '../illustrations/Icon.jsx';
import { useBasket } from '../hooks/useBasket.jsx';

export default function Toast() {
  const { toast, dismissToast } = useBasket();
  return (
    <div className="toast-region" role="status" aria-live="polite">
      {toast && (
        <div key={toast.key} className="toast">
          <span className="toast__tick" aria-hidden="true"><Icon name="check" size={18} /></span>
          <span>{toast.message}</span>
          <Link to="/contact" onClick={dismissToast} className="toast__link">View list</Link>
        </div>
      )}
    </div>
  );
}
