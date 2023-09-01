<!-- ======================  1-2 part ==================== -->

Створено папку Screens
Створено компонент RegistrationScreen
Створено компонент LoginScreen
Створено компонент PostsScreen
Додано розмітку форми в компонент RegistrationScreen
Додано розмітку форми в компонент LoginScreen
Додано стилі до компонента RegistrationScreen
Додано стилі до компонента LoginScreen

<!-- ======================= 3 part ====================== -->

Додано логіку роботи з формою в компонент RegistrationScreen
Додано логіку роботи з формою в компонент LoginScreen
Під час сабміту форм збираються дані з них і виводяться в консоль
Додано автозакриття клавіатури по кліку за межами форм (Використовуючи Keyboard.dismiss)

<!-- ======================= 4 part ====================== -->

Додано екран CreatePostsScreen
Додано екран CommentsScreen
Додано  екран ProfileScreen
Додано  екран MapScreen
Додано  екран Home
Підключено в проект навігацію.
Додано в проект переходи між екранами LoginScreen, RegistrationScreen за допомогою компонента createStackNavigator
З RegistrationScreen можна перейти на LoginScreen, натиснувши на текст Увійти
З LoginScreen можна перейти на RegistrationScreen, натиснувши на текст Зареєструватися
Після сабміту в LoginScreen, RegistrationScreen перекидає на Home, де відразу показується екран PostsScreen
Підключено нижню навігацію, використовуючи createBottomTabNavigator
У нижній навігації створено 3 переходи.
Клік по іконці №1 веде на екран PostsScreen
Клік по іконці №2 веде на екран CreatePostsScreen
Клік по іконці №3 веде на екран ProfileScreen
В хедері на екрані PostsScreen додано іконку для logout
Стилізувано нижню навігацію

<!-- ======================== 5 part ===================== -->

Підключено камеру в компонент CreatePostsScreen;
Під час відкриття екрану CreatePostsScreen активується камера і зображення з неї виводиться в блок з іконкою камери
По кліку на іконку камери робиться знімок
В інпут з плейсхолдером Назва можна додати назву фото
В інпут з плейсхолдером Місцевість можна додати назву, де було зроблено знімок
Додано визначення геолокації в момент створення посту при кліку на кнопку Опублікувати
Після створення посту повинно перенаправляти на екран PostsScreen
В компоненті окремого посту при кліку на іконку коментарів перекидає на екран CommentsScreen
У компоненті окремого посту під час кліку на іконку геолокації перекидає на екран MapScreen, де можна побачити мапу з маркером, де була зроблена фотографія