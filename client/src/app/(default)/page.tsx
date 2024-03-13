"use client";

import { UserProductService } from "@/services";
import { useAuth } from "@/shared/helpers/auth";
import type { IError } from "@/shared/types";
import { type Product } from "@/shared/types/product";
import { ToggleThemeButton } from "@/shared/ui";
import { ProductCard } from "@/widgets";
import { ShoppingCart } from "@mui/icons-material";
import {
  Badge,
  Button,
  ButtonGroup,
  Divider,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/joy";
import { type AxiosError } from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<IError>({
    isError: false,
    text: "",
  });

  const { user, isAuth, signout } = useAuth();

  const getProducts = async () => {
    setIsLoading(true);
    try {
      const response = await UserProductService.getAll();
      setProducts(response.data);
      setIsError({
        isError: false,
        text: "",
      });
    } catch (error) {
      const axiosError = error as AxiosError;
      setIsError({
        isError: true,
        text: "Произошла ошибка при получении данных!",
        status: axiosError.response?.status,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const getProductsLength = () => {
    if (!user || !user.cart) {
      return 0;
    }

    const productsIds = user.cart.map((product) => product._id);
    const uniqueArray = [...new Set(productsIds)];
    return uniqueArray.length;
  };

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
      <title>Товары</title>
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
        <Typography level="h2" textAlign="center">
          Товары
        </Typography>
        <ButtonGroup variant="solid">
          <Badge
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            badgeContent={getProductsLength()}
            color="danger"
          >
            <IconButton
              component={Link}
              variant="solid"
              color="primary"
              href={"/cart"}
            >
              <ShoppingCart />
            </IconButton>
          </Badge>
          <Button
            color="primary"
            onClick={getProducts}
            loading={isLoading}
            loadingPosition="start"
          >
            Обновить
          </Button>
          <Button color="primary" onClick={signout}>
            Выйти
          </Button>

          <ToggleThemeButton variant="solid" color="warning" />
        </ButtonGroup>
      </Stack>
      <Stack mt={4} direction="row" gap={2} flexWrap="wrap">
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </Stack>
    </Stack>
  );
};

export default ProductsPage;
