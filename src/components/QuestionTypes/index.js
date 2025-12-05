import TextQuestion from './TextQuestion';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import CheckboxQuestion from './CheckboxQuestion';
import DropdownQuestion from './DropdownQuestion';
import NumberQuestion from './NumberQuestion';
import DateTimeQuestion from './DateTimeQuestion';
import PhotoQuestion from './PhotoQuestion';
import FileUploadQuestion from './FileUploadQuestion';
import SignatureQuestion from './SignatureQuestion';
import RatingQuestion from './RatingQuestion';
import YesNoQuestion from './YesNoQuestion';
import { QuestionType } from '../../types';

export const QuestionComponents = {
  [QuestionType.TEXT]: TextQuestion,
  [QuestionType.TEXTAREA]: TextQuestion,
  [QuestionType.MULTIPLE_CHOICE]: MultipleChoiceQuestion,
  [QuestionType.CHECKBOXES]: CheckboxQuestion,
  [QuestionType.DROPDOWN]: DropdownQuestion,
  [QuestionType.NUMBER]: NumberQuestion,
  [QuestionType.DATE]: DateTimeQuestion,
  [QuestionType.TIME]: DateTimeQuestion,
  [QuestionType.DATETIME]: DateTimeQuestion,
  [QuestionType.PHOTO]: PhotoQuestion,
  [QuestionType.FILE_UPLOAD]: FileUploadQuestion,
  [QuestionType.SIGNATURE]: SignatureQuestion,
  [QuestionType.RATING]: RatingQuestion,
  [QuestionType.YES_NO]: YesNoQuestion,
};

export {
  TextQuestion,
  MultipleChoiceQuestion,
  CheckboxQuestion,
  DropdownQuestion,
  NumberQuestion,
  DateTimeQuestion,
  PhotoQuestion,
  FileUploadQuestion,
  SignatureQuestion,
  RatingQuestion,
  YesNoQuestion,
};
