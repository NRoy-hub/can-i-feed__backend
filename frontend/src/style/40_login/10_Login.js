import styled, { css } from 'styled-components';

export default styled.section`
  ${ ({ color }) => css`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .top_bar{ position: fixed; }
    .login_frame{
      position: relative;
      box-sizing: border-box;
      width: 440px;
      border: 1px solid #ACACAC;
      padding: 30px 70px;

      .logo{
        position: absolute;
        top: -127px;
        left: 136px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: white;
        color: ${ color.grey };
        font-weight: bold;
      }
      .logo img{
        width: 116px;
        height: 116px; 
        margin-top: 10px;
      }
    }

  `}
`;