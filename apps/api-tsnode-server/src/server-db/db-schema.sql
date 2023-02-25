CREATE TABLE account (
  account_id        SERIAL        NOT NULL,
  password_hash     VARCHAR(255)  NOT NULL,
  created_time      TIMESTAMP     NOT NULL,

  PRIMARY KEY (account_id)
);

CREATE TABLE auth_token (
  auth_token_id     SERIAL       NOT NULL,
  auth_secret       VARCHAR(255) NOT NULL,
  account_id        INTEGER      NOT NULL,
  created_time      TIMESTAMP    NOT NULL,

  PRIMARY KEY (auth_token_id),
  CONSTRAINT auth_token_account_id FOREIGN KEY (account_id) REFERENCES account(account_id)
);

CREATE TABLE phone_number_lookup (
  phone_number      VARCHAR(255)    NOT NULL,
  account_id        INTEGER         NOT NULL,
  verified_time     TIMESTAMP       NOT NULL,
  created_time      TIMESTAMP       NOT NULL,

  PRIMARY KEY (phone_number),
  CONSTRAINT phone_number_lookup_account_id FOREIGN KEY (account_id) REFERENCES account(account_id)
);
