import styled from "styled-components";

export const Container = styled.div`
 z-index:1000;
 position: fixed;
 top: 0;
 left: 0;
 width: 100%;
 height: 100%;
 background-color: rgba(0, 0, 0, 0.5);
 display: flex;
 justify-content: center;
 align-items: center;


.alert-modal {
  margin-left: 40px;
  margin-right: 40px;
  width: 380px;
  display: flex;
  flex-direction:column;
  gap: 10px;
  justify-content:center;
  align-items:center;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_600};
  padding: 20px;
  border-radius: 4px;
  text-align: center;

}

.alert-modal p {
  margin-bottom: 10px;
  font-size: 16px;
}

.alert-modal button {
  width: 340px;
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.COLORS.BLUE_400};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}



`;