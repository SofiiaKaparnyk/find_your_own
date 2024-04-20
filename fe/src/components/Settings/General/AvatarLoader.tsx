import { Button, GetProp, Upload, UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import { UploadOutlined } from '@ant-design/icons';
import { axiosInstance } from 'utils/axios';
import { Endpoints } from 'constants/index';
import { IUserProfile } from 'types/users';
import { RcFile } from 'antd/es/upload';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export default function AvatarLoader({ user }: {user: IUserProfile}) {
  // const [user, setUser] = useState<IUserProfile>();
  // const { setIsLoading } = useLoading();

  // useEffect(() => {
  //   setIsLoading(true);
  //   getUserProfile()
  //     .then((data) => {
  //       if (data) {
  //         setUser(data);
  //       }
  //     })
  //     .finally(() => setIsLoading(false));
  // }, []);
  const onChange = ({ fileList }: any) => {
    // setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const imgWindow = window.open(src);

    if (imgWindow) {
      const image = new Image();
      image.src = src;
      imgWindow.document.write(image.outerHTML);
    } else {
      window.location.href = src;
    }
  };

  const customAction = ({ file }: { file: string | RcFile | Blob }) => {
    const data = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      image: file,
    };
    axiosInstance
      .put(Endpoints.USER_PROFILE, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        // if (res.statusText === 'Created') {
        console.log(res);
        // }
      })
      .catch(() => {});
  };

  return (
    <ImgCrop showGrid rotationSlider showReset>
      <Upload
        customRequest={customAction}
        method="PUT"
        onChange={onChange}
        onPreview={onPreview}
      >
        <Button type="primary" icon={<UploadOutlined />}>
          Upload Photo
        </Button>
      </Upload>
    </ImgCrop>
  );
}
