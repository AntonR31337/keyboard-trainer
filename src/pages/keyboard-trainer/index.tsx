import { useEffect, useState } from "react";
import { Card, Col, Modal, Row, Statistic } from "antd";
import "./styles.css";
import Metronome from "../../components/metronome";
import StatisticPage from "../../components/statistic";
import { useNavigate } from "react-router-dom";
import { textStore } from "../../store/text-store";
import { observer } from "mobx-react-lite";
import { observable } from "mobx";

const { Countdown } = Statistic;

const KeyboardTrainer = observer(() => {
  const navigate = useNavigate();

  const {
    rightText,
    leftText,
    setRightText,
    setLeftText,
    resetRightText,
    resetLeftText,
  } = textStore;

  const [isFinish, setIsFinish] = useState<boolean>(false);
  const [deadline, setDeadline] = useState<number>(0);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  useEffect(() => {
    textStore.getNewText();
    console.log("useEffect");
  }, []);

  const checkDeadline = () => {
    if (!isFinish && deadline < Date.now()) {
      setDeadline(Date.now() + 60 * 1000 * 1);
    }
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    const letter = event.key;

    if (rightText.length < 20) {
      console.log("handleKeyPress");
      textStore.getNewText();
    }

    if (rightText.length > 0 && letter === rightText[0]) {
      checkDeadline();

      setLeftText(leftText.concat(letter));
      setRightText(rightText.slice(1));
    }
  };

  const startGame = () => {
    setIsFinish(false);
    setIsOpenModal(false);
    resetLeftText();
    resetRightText();
    textStore.getNewText();
    console.log("startGame");
  };

  const onFinish = () => {
    setIsFinish(true);
    setIsOpenModal(true);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isFinish) {
        handleKeyPress(event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Countdown
            value={deadline}
            onFinish={onFinish}
            style={{ textAlign: "center" }}
          />
          <Metronome />
        </Col>

        <Col span={24}>
          <Card bordered={true}>
            <div className='wrapper'>
              <div className='left'>{leftText}</div>
              <div className='right'>{rightText}</div>
            </div>
          </Card>
        </Col>
      </Row>

      <Modal
        open={isOpenModal}
        centered
        cancelText={"Еще раз"}
        okText={"Завершить"}
        closeIcon={null}
        onOk={() => navigate("/")}
        onCancel={startGame}
      >
        <StatisticPage />
      </Modal>
    </>
  );
});

export default observable(KeyboardTrainer);
