

CREATE TABLE `user` (
    `user_id` int  AUTO_INCREMENT NOT NULL,
    `user_first_name` varchar(20)  NOT NULL ,
    `user_last_name` varchar(20)  NOT NULL ,
    `username` varchar(15)  NOT NULL ,
    `role` varchar(15)  NOT NULL ,
    `nic` varchar(12)  NOT NULL ,
    `user_address1` varchar(30)  NOT NULL ,
    `user_address2` varchar(30)  NOT NULL ,
    `password` varchar(10)  NOT NULL ,
    PRIMARY KEY (
        `user_id`
    )
);

CREATE TABLE `equipment` (
    `eq_id` int  NOT NULL AUTO_INCREMENT,
    `eq_name` varchar(20)  NOT NULL ,
    `rental` decimal(6,2)  NOT NULL ,
    `date_of_purchase` date  NOT NULL ,
    `warranty_date` date  NOT NULL ,
    `end_of_warranty_period` date  NOT NULL ,
    `eq_image` varchar(40)  NOT NULL ,
    `eq_cost` decimal(6,2)  NOT NULL ,
    `defected_status` int  NOT NULL ,
    `user_enetered_value` int  NOT NULL ,
    PRIMARY KEY (
        `eq_id`
    )
);

CREATE TABLE `equipment_description` (
    `eq_des_id` int  NOT NULL ,
    `eq_attribute` varchar(20)  NOT NULL ,
    PRIMARY KEY (
        `eq_des_id`
    )
);

CREATE TABLE `customer` (
    `cus_id` int  NOT NULL AUTO_INCREMENT ,
    `nic` varchar(10)  NOT NULL ,
    `cus_fname` varchar(20)  NOT NULL ,
    `cus_lname` varchar(20)  NOT NULL ,
    `cus_address1` varchar(30)  NOT NULL ,
    `cus_address2` varchar(30)  NOT NULL ,
    PRIMARY KEY (
        `cus_id`
    )
);


CREATE TABLE `payment` (
    `pay_id` int  NOT NULL ,
    `pay_date` date  NOT NULL ,
    `amount` decimal(6,2)  NOT NULL ,
    `pay_invoice_id` int  NOT NULL ,
    PRIMARY KEY (
        `pay_id`
    )
);

CREATE TABLE `invoice` (
    `inv_id` int  NOT NULL AUTO_INCREMENT,
    `advance` decimal(6,2)  NOT NULL ,
    `duration` int  NOT NULL ,
    `borrowed_date` date  NOT NULL ,
    `return_date` date  NOT NULL ,
    `total` decimal(6,2)  NOT NULL ,
    `inv_cashier_id` int  NOT NULL ,
    `inv_cus_id` int  NOT NULL ,
    PRIMARY KEY (
        `inv_id`
    )
);

CREATE TABLE `bill` (
    `bill_id` int  NOT NULL ,
    `issued_date` date  NOT NULL ,
    `bill_inv_id` int  NOT NULL ,
    PRIMARY KEY (
        `bill_id`
    )
);

ALTER TABLE `equipment` ADD CONSTRAINT `fk_equipment_user_enetered_value` FOREIGN KEY(`user_enetered_value`)
REFERENCES `user` (`user_id`);

ALTER TABLE `equipment_description` ADD CONSTRAINT `fk_equipment_description_eq_des_id` FOREIGN KEY(`eq_des_id`)
REFERENCES `equipment` (`eq_id`);

ALTER TABLE `payment` ADD CONSTRAINT `fk_payment_pay_invoice_id` FOREIGN KEY(`pay_invoice_id`)
REFERENCES `invoice` (`inv_id`);

ALTER TABLE `invoice` ADD CONSTRAINT `fk_invoice_inv_cashier_id` FOREIGN KEY(`inv_cashier_id`)
REFERENCES `user` (`user_id`);

ALTER TABLE `invoice` ADD CONSTRAINT `fk_invoice_inv_cus_id` FOREIGN KEY(`inv_cus_id`)
REFERENCES `customer` (`cus_id`);

ALTER TABLE `bill` ADD CONSTRAINT `fk_bill_bill_inv_id` FOREIGN KEY(`bill_inv_id`)
REFERENCES `invoice` (`inv_id`);

