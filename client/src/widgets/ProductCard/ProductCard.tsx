"use client";

import { useAuth } from "@/shared/helpers/auth";
import type { Product } from "@/shared/types/product";
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/joy";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import s from "./ProductCard.module.scss";

type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addProductToCart, removeProductFromCart, user } = useAuth();
  const [addedCount, setAddedCount] = useState(0);

  const getProductLength = () => {
    if (!user || !user.cart) {
      setAddedCount(0);
      return 0;
    }

    const productsCount = user.cart.filter(
      (item) => item._id === product._id
    ).length;
    setAddedCount(productsCount);
    return productsCount;
  };

  useEffect(() => {
    getProductLength();
  }, [user?.cart, user, []]);

  return (
    <Card
      className={s.articleCard}
      sx={{
        padding: 0,
        flexGrow: 1,
      }}
    >
      <div className={s.imageWrapper}>
        <Image
          src={product.preview}
          width={200}
          height={100}
          alt={product.name}
          className={s.image}
          draggable={false}
        />
      </div>
      <Stack
        paddingInline={2}
        paddingBottom={2}
        height="100%"
        justifyContent="space-between"
      >
        <Stack gap={1}>
          <p className={s.title}>{product.name}</p>
          <p className={s.desc}>{product.description}</p>
          <Typography color="primary" level="body-lg">
            {product.price}{" "}
            <Typography color="neutral" level="body-lg">
              руб.
            </Typography>
          </Typography>
        </Stack>
        <Stack width="100%" alignItems="center">
          <Divider
            sx={{
              mt: 1.5,
              mb: 1.5,
            }}
          />
          <ButtonGroup
            sx={{
              mt: 1.5,
              width: "100%",
            }}
          >
            <Badge
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              sx={{
                flexGrow: 1,
              }}
              badgeContent={addedCount}
              color="danger"
            >
              <Button
                variant="solid"
                color="primary"
                fullWidth
                onClick={() => {
                  addProductToCart(product._id);
                }}
                disabled={addedCount >= product.stock}
              >
                Добавить в корзину
              </Button>
            </Badge>

            {addedCount > 0 && (
              <>
                <IconButton
                  variant="solid"
                  color="success"
                  onClick={() => {
                    addProductToCart(product._id);
                  }}
                  disabled={addedCount >= product.stock}
                >
                  <FaPlus />
                </IconButton>
                <IconButton
                  variant="solid"
                  color="danger"
                  onClick={() => {
                    removeProductFromCart(product._id);
                  }}
                >
                  <FaMinus />
                </IconButton>
              </>
            )}
          </ButtonGroup>
        </Stack>
      </Stack>
    </Card>
  );
};
