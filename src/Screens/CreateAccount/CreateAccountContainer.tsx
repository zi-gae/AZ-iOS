import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useHandleInput } from '~/hooks';
import CreateAccountViewer from './CreateAccountViewer';
import { useToggle } from '~/hooks';
import { arrayConditionCheck } from '~/lib';
import {
  postCreataeAccountThunk,
  postVerifyIdThunk,
} from '~/store/modules/auth/thunks';
import { postCreateAccount, postIdentificationCheck } from '~/api';
import { RootState } from '~/store/modules';

const CreateAccountContainer = () => {
  const dispatch = useDispatch();
  const {
    auth: { status, error, duplicateCheck },
    auth,
    loading,
  } = useSelector((state: RootState) => state);

  useEffect(() => {
    console.log('auth', duplicateCheck);
  }, [auth]);

  const { bind: idBinder } = useHandleInput('');
  const { bind: pwdBinder } = useHandleInput('');
  const { bind: verifyBinder } = useHandleInput('');
  const { bind: nicknameBinder } = useHandleInput('');

  const userIdDuplicateCheck = () => {
    const config = {
      ...postIdentificationCheck,
      identification: idBinder.text,
    };
    dispatch(postVerifyIdThunk(config));
  };
  const passwordEqualCheck = () => {
    return pwdBinder.text === verifyBinder.text ? true : false;
  };
  const usernameDuplicateCheck = () => {
    return true;
  };

  const passwordHooks = useToggle(undefined, passwordEqualCheck);

  const availables = [
    {
      placeholder: '아이디',
      guideMsg: '아이디 중복',
      bind: idBinder,
      onToggle: userIdDuplicateCheck,
      isAvailable: duplicateCheck.isIdUsed,
    },
    {
      ...passwordHooks,
      placeholder: '비밀번호 입력',
      guideMsg: '',
      bind: pwdBinder,
    },
    {
      ...passwordHooks,
      placeholder: '비밀번호 확인',
      guideMsg: '비밀번호 틀림',
      bind: verifyBinder,
    },
    {
      ...useToggle(undefined, usernameDuplicateCheck),
      placeholder: '별명 입력',
      guideMsg: '별명 중복',
      bind: nicknameBinder,
    },
  ];

  const [isActivationSignup, setActivationSignup] = useState<boolean>(false);

  const handleCreateAccount = () => {
    const config = {
      ...postCreateAccount,
      identification: idBinder.text,
      nickname: nicknameBinder.text,
      password: pwdBinder.text,
    };

    dispatch(postCreataeAccountThunk(config));
  };

  useEffect(() => {
    const isReady = arrayConditionCheck(
      availables,
      (available) => available.isAvailable === true,
    );
    // API 요청했는지 확인 하는 조건 추가 해야함.
    setActivationSignup(isReady);
  }, [...availables]);

  return (
    <CreateAccountViewer
      availables={availables}
      isActivationSignup={isActivationSignup}
      handleCreateAccount={handleCreateAccount}
    />
  );
};

export default CreateAccountContainer;
