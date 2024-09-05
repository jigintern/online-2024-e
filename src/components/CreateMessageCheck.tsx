import { css, cx } from "@hono/hono/css";
import { WithHTML } from "../layout/WithHTML.tsx";
import { CocktailGlass } from "./CocktailGlass.tsx";
import { getCocktail } from "./utils.ts";

const imageStyle = css`
  height: 75vh;
  display: flex;
  justify-content: center;

  svg {
    height: calc(100% - 9rem);
    margin-top: 4rem;
  }
`;

const messageContainerStyle = css`
  display: grid;
  grid-template-columns: 7rem 1fr 7rem;
  grid-template-rows: 20% 20% 20% 20% 20%;
  position: absolute;
  top: 0;
  height: 75vh;
  width: calc(100% - 3.5rem);
  max-width: 430px;

  #grid-item-1 {
    grid-area: 1 / 1 / 2 / 1;
  }

  #grid-item-2 {
    grid-area: 2 / 3 / 3 / 3;
    justify-self: right;
  }

  #grid-item-3 {
    grid-area: 3 / 1 / 4 / 1;
  }

  #grid-item-4 {
    grid-area: 4 / 3 / 5 / 3;
    justify-self: right;
  }
`;

const messageStyle = css`
  min-width: 7rem;
  min-height: 7rem;
  border-radius: 100%;
  margin-top: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    color: var(--color-black);
    margin: 0 1rem;
  }
`;

const buttonContainerStyle = css`
  display: flex;
  justify-content: space-between;
`;

const buttonStyle = css`
  margin-bottom: 4rem;
  background-color: var(--color-base);
  border-radius: 0.5rem;
  width: 7.5rem;
  height: 7.25rem;
  display: flex;
  text-align: center;
  justify-content: center;

  a {
    display: block;
    color: var(--color-black);
    text-decoration: none;
    font-size: 1rem;
    padding: 2.9rem 1rem;
  }
`;

const sendButtonStyle = css`
  background-color: var(--color-accent);

  a {
    color: var(--color-white);
    padding: 2.1rem 1.5rem;
  }
`;

/**
 * 作成したメッセージを確認する画面を返す
 */

export const CreateMessageCheck = async () => {
  const cocktailNames = [
    "スパニッシュ・タウン",
    "カンパリオレンジ",
    "アクダクト",
    "オレンジブロッサム",
  ];

  const cocktails = cocktailNames.map(async (name) => {
    return await getCocktail(name);
  });
  const colors = [];
  for await (const cocktail of cocktails) colors.push(cocktail.color);

  return (
    <WithHTML>
      <div>
        <div class={imageStyle}>
          <CocktailGlass colors={colors} />
        </div>
        <div class={messageContainerStyle}>
          {cocktails.map(async (cocktail, index) => {
            return (
              <div
                class={messageStyle}
                id={`grid-item-${index + 1}`}
                style={
                  (await cocktail).word
                    ? `background-color: ${(await cocktail).color};`
                    : "display: none"
                }
              >
                <p>{(await cocktail).word}</p>
              </div>
            );
          })}
        </div>
        <div class={buttonContainerStyle}>
          <div class={buttonStyle}>
            <a href="./">つくり直す</a>
          </div>
          <div class={cx(buttonStyle, sendButtonStyle)}>
            <a href="./check">
              気持ちを
              <br />
              送る
            </a>
          </div>
        </div>
      </div>
    </WithHTML>
  );
};
