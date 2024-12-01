import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DecisionModel({
  showModel,
  setShowModel,
  message,
  handleDelete,
}) {
  return (
    <Modal
      show={showModel}
      size="md"
      onClick={() => setShowModel(false)}
      popup
      className="decision-modal"
    >
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
          <div className="mb-5 text-lg text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this {message}?
          </div>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={handleDelete}>
              Yes, I'm sure
            </Button>
            <Button color="gray" onClick={() => setShowModel(false)}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
