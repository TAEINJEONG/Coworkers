import { useModalStore } from '@/shared/store/useModalStore';
import Modal from '../../../../shared/ui/Modal';

const ModalRoot = () => {
  const { isOpen, content, close } = useModalStore();

  if (!isOpen || !content) return null;

  return <Modal onClose={close}>{content}</Modal>;
};

export default ModalRoot;
