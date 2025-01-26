import React from "react";
import StatisticPage from "../../components/statistic";
import { Button, Flex } from "antd";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <StatisticPage length={2} mistakes={2} />
      <Flex style={{ marginTop: "16px" }}>
        <Button
          danger
          type='primary'
          style={{ margin: "auto" }}
          onClick={() => navigate("/keyboard-trainer")}
        >
          Старт
        </Button>
      </Flex>
    </>
  );
};

export default Home;
