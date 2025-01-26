import {useEffect, useState} from "react";
import {Card, Col, Modal, Row, Statistic, Typography} from "antd";
import "./styles.css";
import Metronome from "../../components/metronome";
import StatisticPage from "../../components/statistic";
import {useNavigate} from "react-router-dom";
import {textStore} from "../../store/text-store";
import {observer} from "mobx-react-lite";
import {observable} from "mobx";

const { Countdown } = Statistic;

const KeyboardTrainer = observer(() => {
  const navigate = useNavigate();

  const {
    rightText,
    leftText,
    loading,
    setRightText,
    setLeftText,
    resetRightText,
    resetLeftText,
  } = textStore;

  const [isFinish, setIsFinish] = useState<boolean>(false);
  const [deadline, setDeadline] = useState<number>(0);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [mistakesCount, setMistakesCount] = useState<number>(0);

  useEffect(() => {
    resetLeftText();
    resetRightText();

    let ignore = false
    if (!ignore ) {
      textStore.getNewText();
    }

    return () => {
      ignore = true;
    }
  }, []);

  const checkDeadline = () => {
    if (!isFinish && deadline < Date.now()) {
      setDeadline(Date.now() + 60 * 1000 * 1);
    }
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    const letter = event.key;

    if (letter === 'Shift') {
      return
    }

    if (rightText.length === 30 && !loading) {
      textStore.getNewText();
    }

    if (letter !== rightText[0]) {
       setMistakesCount(mistakesCount + 1);
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
    setMistakesCount(0);
    textStore.getNewText();
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

      {!deadline && (
          <Row gutter={[16, 16]}>
            <Typography.Title type={'warning'} style={{margin: '10px auto'}} >
              Для старта начните печатать предложенный текст
            </Typography.Title>
          </Row>
      )}


      <Modal
        open={isOpenModal}
        centered
        cancelText={"Еще раз"}
        okText={"Завершить"}
        closeIcon={null}
        onOk={() => navigate("/")}
        onCancel={startGame}
      >
        <StatisticPage length={leftText.length}  mistakes={mistakesCount}/>
      </Modal>
    </>
  );
});

export default observable(KeyboardTrainer);
