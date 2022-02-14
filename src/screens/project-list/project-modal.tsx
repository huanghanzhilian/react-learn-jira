import { Button, Drawer } from "antd";

import { useProjectModal } from "./util";

const ProjectModal = () => {
  const { projectCreate, close } = useProjectModal();
  return (
    <Drawer width={"100%"} visible={projectCreate} onClose={close}>
      <h1>Project Modal</h1>
      <Button onClick={close}>关闭</Button>
    </Drawer>
  );
};

export default ProjectModal;
