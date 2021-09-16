import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
// import { Provider } from 'react-redux';
// import configureStore from 'redux-mock-store';
import Router from 'next/router';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Menu from '../components/Menu/Menu';

Enzyme.configure({ adapter: new Adapter() });

// const { shallow, mount } = Enzyme;

jest.mock(
  'next/link',
  () =>
    ({ children }: { children: any }) =>
      children
);

// jest.mock('next/router', () => ({
//   useRouter: jest.fn()
// }));

describe('Menu component testing', () => {
  const spies: any = {};

  beforeEach(() => {
    render(<Menu />);

    spies.routerChangeStart = jest.fn();
    Router.events.on('routeChangeStart', spies.routerChangeStart);
  });

  afterEach(() => {
    Router.events.off('routeChangeStart', spies.routerChangeStart);
  });

  test('default state rendered', () => {
    const listsButton = screen.getByTestId('listsButton');
    const userInfoButton = screen.getByTestId('userInfoButton');
    const listsHeader = screen.getByTestId('listsHeader') as HTMLHeadingElement;
    const userInfoHeader = screen.getByTestId(
      'userInfoHeader'
    ) as HTMLHeadingElement;

    expect(listsHeader.innerHTML).toEqual('Lists');
    expect(userInfoHeader.innerHTML).toEqual('User Info');
    expect(listsButton).toBeInTheDocument();
    expect(userInfoButton).toBeInTheDocument();
  });

  // test('Renders', () => {
  //   const messages = {
  //     LABEL: 'Maguffin'
  //   };

  //   const menuPage = mount(<Menu path="/" />);
  // });

  // test('Test the page redirect after click', async () => {
  //   // const wrapper = mount(<Menu />);
  //   const wrapper = mount(<Menu />);

  //   await wrapper.find('.listsLink').at(0).simulate('click');

  //   expect(spies.routerChangeStart).toHaveBeenCalledWith('/lists');
  // });

  // test.only('redirect to correct page', async () => {
  //   const push = jest.fn();
  //   const mockFn = jest.fn().mockImplementationOnce((cb) => cb(null, false));
  //   mockFn(() => ({
  //     asPath: '/',
  //     push
  //   }));

  //   const mytest = screen.getByTestId('listsLink');
  //   fireEvent.click(mytest);
  //   expect(push).toHaveBeenCalledWith('/lists');
  // });
});
