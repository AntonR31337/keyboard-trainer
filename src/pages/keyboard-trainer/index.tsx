import { useEffect, useState } from "react";
import { Card, Col, Modal, Row, Statistic } from "antd";
import "./styles.css";
import Metronome from "../../components/metronome";
import StatisticPage from "../../components/statistic";
import { useNavigate } from "react-router-dom";

const { Countdown } = Statistic;

const URL = "https://fish-text.ru/get?";

const KeyboardTrainer = () => {
  const navigate = useNavigate();

  const [leftText, setLeftText] = useState<string>("");
  const [rightText, setRightText] = useState<string>("");

  const [isFinish, setIsFinish] = useState<boolean>(false);
  const [deadline, setDeadline] = useState<number>(0);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const getNewText = (): void => {
    fetch(URL + "&type=sentence&number=1").then((res) =>
      res
        .json()
        .then(({ text }) =>
          setRightText((prev) =>
            prev.concat(prev.length > 0 ? " " + text : text)
          )
        )
    );
  };

  useEffect(() => getNewText(), []);

  const checkDeadline = () => {
    if (!isFinish && deadline < Date.now()) {
      setDeadline(Date.now() + 60 * 1000 * 1);
    }
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    const letter = event.key;

    if (rightText.length < 20) {
      getNewText();
    }

    if (rightText.length > 0 && letter === rightText[0]) {
      checkDeadline();

      setLeftText((prev) => prev.concat(letter));
      setRightText((prev) => prev.slice(1));
    }
  };

  const startGame = () => {
    setIsFinish(false);
    setIsOpenModal(false);
    setLeftText("");
    setRightText("");
    getNewText();
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
};

export default KeyboardTrainer;
