import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  > header {
    height: 144px;
    background: #28262e;

    display: flex;
    align-items: center;

    div {
      max-width: 1120px;
      width: 100%;
      margin: 0 auto;

      svg {
        color: #999591;
        width: 24px;
        height: 24px;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  align-items: center;

  width: 100%;

  margin: -176px auto 0;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    display: flex;
    flex-direction: column;

    h1 {
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
    }
  }
`;

export const AvatarInput = styled.div`
  position: relative;
  width: 186px;
  align-self: center;
  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  label {
    position: absolute;
    width: 48px;
    height: 48px;
    background: #ff9800;
    border-radius: 50%;
    right: 0;
    bottom: 0;
    border: none;

    transition: background-color 0.2s;

    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      width: 20px;
      height: 20px;

      color: #312e38;
    }

    &:hover {
      background-color: ${shade(0.2, '#ff9000')};
      cursor: pointer;
    }

    input {
      display: none;
    }
  }

  margin: 32px 0;
`;
