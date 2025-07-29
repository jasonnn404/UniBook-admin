import ResourceTable from "../features/resources/ResourceTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddResource from "../features/resources/AddResource";
import ResourceTableOperations from "../features/resources/ResourceTableOperations";

function Resources() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All resources</Heading>
        <ResourceTableOperations />
      </Row>

      <Row>
        <ResourceTable />
        <AddResource />
      </Row>
    </>
  );
}

export default Resources;
