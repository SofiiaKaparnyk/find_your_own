import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';
import { Button, Flex } from 'antd';
import UK from 'assets/languages/ukraine-flag-icon.png';
import EN from 'assets/languages/united-states-flag-icon.png';

export default function LanguageSwitch() {
  const { t, i18n } = useTranslation();

  const handleClickLng = () => {
    const lng = i18n.language === 'en' ? 'uk' : 'en';
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  const imgSrc = i18n.language === 'uk' ? UK : EN;

  return (
    <Flex align="center" gap={4}>
      <img src={imgSrc} alt="" width={24} />
      <Button
        title={t('language.title')}
        type="text"
        icon={<LanguageIcon />}
        onClick={handleClickLng}
        style={{
          color: 'inherit',
        }}
      />
    </Flex>
  );
}
