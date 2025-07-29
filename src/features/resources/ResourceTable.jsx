import Spinner from "../../ui/Spinner";
import ResourceRow from "./ResourceRow";
import { useResources } from "./useResources";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function ResourceTable() {
  const { isLoading, resources } = useResources();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!resources.length) return <Empty resourceName="resources" />;

  // 1) FILTER
  const filterValue = searchParams.get("discount") || "all";

  let filteredResources;
  if (filterValue === "all") filteredResources = resources;
  if (filterValue === "no-discount")
    filteredResources = resources.filter((resource) => resource.discount === 0);
  if (filterValue === "with-discount")
    filteredResources = resources.filter((resource) => resource.discount > 0);

  // 2) SORT
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedResources = filteredResources.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Resource</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          // data={resources}
          // data={filteredResources}
          data={sortedResources}
          render={(resource) => (
            <ResourceRow resource={resource} key={resource.id} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default ResourceTable;
