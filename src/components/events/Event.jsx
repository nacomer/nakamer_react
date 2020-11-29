import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import Icon from '@mdi/react';
import { mdiDotsVertical, mdiShareVariant, mdiHeart } from '@mdi/js';
import {
  Alert,
  CardContent,
  IconButton,
  CardHeader,
  CardAction,
  CardMedia,
  Subtitle1,
  Subtitle2,
  Divider,
  Spacer,
  Button,
  Body2,
  Card,
  Fab,
  H6,
  H5,
  H4,
} from 'ui-neumorphism';
import EventService from '../../services/eventService';

export default function Event(props) {
  const [eventInfo, setEventInfo] = useState({});
  useEffect(() => {
    // cookieに保存されているtokenIdが有効な場合はcookieに含まれる情報をstateにセットする
    const getEvent = async () => {
      const eventService = new EventService();
      // TODO: 表示のテストのため、seedされたeventIdを直接指定しています。
      // ここは適宜変更をお願いします。
      const eventId = '2d9065a2-da6e-4f58-8547-3f3f0c202430';
      const eventInfoRes = await eventService.getEventInfo(
        props.loginUser,
        eventId,
      );
      setEventInfo(eventInfoRes.data);
    };
    getEvent();
  }, []);

  return (
    <div className="clearfix">
      <CardHeader
        title={<H6>We partnered up with Google</H6>}
        subtitle={<Subtitle2 secondary>We partnered up with Google</Subtitle2>}
        // action={
        //   <IconButton>
        //     <Icon path={mdiDotsVertical} size={1} />
        //   </IconButton>
        // }
      />
      <Card width={200} className="picture">
        <CardMedia dark src="images/beaches-2.jpg" />
      </Card>
      <CardAction>
        <Card flat className="eventbox">
          {eventInfo.properties ? (
            eventInfo.properties.map((data, idx) => (
              <Alert className="mb-6" type="info" key={idx}>
                {data.name}
              </Alert>
            ))
          ) : (
            <></>
          )}
        </Card>
      </CardAction>
    </div>
  );
}
