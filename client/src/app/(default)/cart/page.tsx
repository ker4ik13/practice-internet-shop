"use client";

import { useAuth } from "@/shared/helpers/auth";
import type { IError } from "@/shared/types";
import { Product } from "@/shared/types/product";
import { ToggleThemeButton } from "@/shared/ui";
import { CartCard } from "@/widgets";
import { ShoppingCart } from "@mui/icons-material";
import {
  Badge,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Divider,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/joy";
import Link from "next/link";
import { useEffect, useState } from "react";

const CartPage = () => {
  const [uniqueProducts, setUniqueProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<IError>({
    isError: false,
    text: "",
  });

  const { user, isAuth, signout } = useAuth();

  const getProductsLength = () => {
    if (!user || !user.cart) {
      return 0;
    }

    const productsIds = user.cart.map((product) => product._id);
    const uniqueArray = [...new Set(productsIds)];
    return uniqueArray.length;
  };

  const getUniqueProducts = () => {
    if (!user || !user.cart) {
      setUniqueProducts([]);
      return [];
    }

    const uniqueArray: Product[] = [];
    user.cart.map((product) => {
      if (uniqueArray.some((item) => item._id === product._id)) {
        return;
      }

      uniqueArray.push(product);
    });

    setUniqueProducts(uniqueArray);
    return uniqueArray;
  };

  useEffect(() => {
    getUniqueProducts();
  }, [user, user?.cart]);

  if (!user && !isAuth) {
    return (
      <Stack minHeight="100vh" alignItems="center" justifyContent="center">
        <title>Войдите в аккаунт</title>
        <Typography level="h3" fontWeight="lg">
          Войдите в аккаунт
        </Typography>
        <br />
        <Divider>Авторизация</Divider>
        <br />
        <ButtonGroup color="primary">
          <Button variant="solid" href={"/auth/signin"} component="a">
            Войти
          </Button>
          <Button variant="solid" href={"/auth/signup"} component="a">
            Зарегистрироваться
          </Button>
        </ButtonGroup>
      </Stack>
    );
  }

  return (
    <Stack minHeight="100vh" padding={4} position="relative">
      <title>Корзина</title>
      {isLoading && (
        <LinearProgress
          variant="solid"
          sx={{
            position: "absolute",
            top: 10,
            left: "50%",
            zIndex: 5,
            width: 300,
            transform: "translateX(-50%)",
          }}
        />
      )}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        gap={4}
      >
        <Stack direction="row" gap={3}>
          <Typography level="h2" textAlign="center">
            Корзина
          </Typography>
          <Breadcrumbs>
            <Link href={"/"}>Товары</Link>
            <Typography>Корзина</Typography>
          </Breadcrumbs>
        </Stack>
        <ButtonGroup variant="solid">
          <Badge
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            badgeContent={getProductsLength()}
            color="danger"
          >
            <IconButton variant="solid" color="primary">
              <ShoppingCart />
            </IconButton>
          </Badge>
          <Button color="primary" onClick={signout}>
            Выйти
          </Button>

          <ToggleThemeButton variant="solid" color="warning" />
        </ButtonGroup>
      </Stack>
      {uniqueProducts && uniqueProducts.length && (
        <Stack mt={4} gap={2}>
          {uniqueProducts.map((product) => (
            <CartCard product={product} key={product._id} />
          ))}
        </Stack>
      )}

      {uniqueProducts && uniqueProducts.length && (
        <Button
          variant="solid"
          color="success"
          sx={{
            maxWidth: 300,
            mt: 4,
          }}
        >
          {user && user.cart && user.cart.length
            ? `Оплатить ${user.cart
                .map((item) => item.price)
                .reduce((a, b) => a + b)
                .toLocaleString("ru")} руб.`
            : "Оплатить"}
        </Button>
      )}
    </Stack>
  );
};

export default CartPage;
