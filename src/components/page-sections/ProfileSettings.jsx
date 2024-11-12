import { useState } from "react";
import { Button, Col, Input, Row } from "reactstrap";
import { IoImageOutline } from "react-icons/io5";
import { RiTextSnippet } from "react-icons/ri";
import { GiSoundWaves } from "react-icons/gi";
import { RxVideo } from "react-icons/rx";
import { BsBadge3D } from "react-icons/bs";
import TextEditIcon from "../../assets/modifiedIcons/TextEditIcon";
import ImageEditIcon from "../../assets/modifiedIcons/ImageEditIcon";
import SoundEditIcon from "../../assets/modifiedIcons/SoundEditIcon";
import VideoEditIcon from "../../assets/modifiedIcons/VideoEditIcon";
import ThreeDEditIcon from "../../assets/modifiedIcons/ThreeDEditIcon";
import LinkEditIcon from "../../assets/modifiedIcons/LinkEditIcon";
import VideoUploadInput from "../inputs/VideoUploadInput";
import { dummyIntroDescription } from "../../dummyData";

const ProfileSettings = () => {
  const [profileSettings, setProfileSettings] = useState({
    introTitle: "Intro Title (Text Editor)",
    introDescription: dummyIntroDescription,
  });
  return (
    <div>
      <VideoUploadInput id={"intro-video"} />
      <div>
        <Input
          value={profileSettings?.introTitle}
          onChange={(e) =>
            setProfileSettings((prev) => ({
              ...prev,
              introTitle: e?.target?.value,
            }))
          }
          size={"lg"}
          style={{ color: "#a9a9a9" }}
          type="text"
          className="bg-transparent border-none p-0 "
        />
        <Input
          value={profileSettings?.introDescription}
          onChange={(e) =>
            setProfileSettings((prev) => ({
              ...prev,
              introDescription: e?.target?.value,
            }))
          }
          style={{ color: "#a9a9a9", height: "700px" }}
          type="textarea"
          className="bg-transparent border-none mb-2 p-0 "
        />
      </div>
    </div>
  );
};

export default ProfileSettings;
