import Button from "../../ui/Button";
import CreateResourceForm from "./CreateResourceForm";
import Modal from "../../ui/Modal";

function AddResource() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="resource-form">
          <Button>Add new resource</Button>
        </Modal.Open>
        <Modal.Window name="resource-form">
          <CreateResourceForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddResource;
